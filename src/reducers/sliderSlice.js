import {
    createEntityAdapter,
    createAsyncThunk,
    createSlice,
    createSelector,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    getAllSliders,
    createSlider,
    removeSlider,
    updateSlider,
    convertToForm,
    handleErrors,
} from './services';

const sliderAdaptor = createEntityAdapter();
const initialState = sliderAdaptor.getInitialState({
    loading: false,
    access: false,
});

export const fetchSliders = createAsyncThunk(
    'slider/fetchSliders',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllSliders();
            return res.data.data.sliders;
        } catch (error) {
            console.error(error);
            if (error.response.status === 403) {
                return rejectWithValue(error.response.data);
            }
        }
    },
);

export const addSlider = createAsyncThunk(
    'slider/addSlider',
    async ({ values, setOpen, resetForm, setErrors }) => {
        console.log(values);
        const formData = convertToForm(values);
        try {
            const res = await createSlider(formData);
            if (res.status === 200) {
                setOpen(false);
                resetForm();
                toast.success(res.data.data.message, { position: 'bottom-right' });
                return res.data.data.slider;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, { position: 'bottom-left' });
            handleErrors(error, setErrors);
        }
    },
);

export const editSlider = createAsyncThunk(
    'slider/editSlider',
    async ({ values, setOpen, resetForm }) => {
        const formData = convertToForm(values);
        try {
            const res = await updateSlider(formData, values.id);
            if (res.status === 200) {
                if (setOpen && resetForm) {
                    setOpen(false);
                    resetForm();
                }
                toast.success(res.data.message, { position: 'bottom-right' });
                console.log(res);
                return res.data.post;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, { position: 'bottom-left' });
        }
    },
);

export const deleteSlider = createAsyncThunk(
    'slider/deleteSlider',
    async (sliderId) => {
        try {
            const res = await removeSlider(sliderId);
            if (res.status === 200) {
                toast.success(res.data.message, { position: 'bottom-right' });
                return sliderId;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, { position: 'bottom-left' });
        }
    },
);

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchSliders.pending]: state => { state.loading = true; },
        [fetchSliders.fulfilled]: (state, action) => {
            state.access = true;
            state.loading = false;
            sliderAdaptor.setAll(state, action.payload);
        },
        [fetchSliders.rejected]: (state, action) => {
            state.loading = false;
            state.access = false;
        },
        [addSlider.fulfilled]: sliderAdaptor.addOne,
        [editSlider.fulfilled]: sliderAdaptor.setOne,
        [deleteSlider.fulfilled]: sliderAdaptor.removeOne,
    },
});

export const {
    selectAll: selectAllSliders,
    selectById: selectSliderById,
} = sliderAdaptor.getSelectors((state) => state.slider);


export const selectSliderDetails = state => state.slider;

export default sliderSlice.reducer;
