import {
    createEntityAdapter,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    getAllProducts,
    createProduct,
    removeProduct,
    updateProduct,
} from './services';

const productAdaptor = createEntityAdapter();
const initialState = productAdaptor.getInitialState();

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async () => {
        try {
            const res = await getAllProducts();
            return res.data.data;
        } catch (error) {
            console.error(error);
        }
    },
);

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async ({ values, setOpen, resetForm }) => {
        try {
            const res = await createProduct(values);
            if (res.status === 200) {
                setOpen(false);
                resetForm();

                toast.success(res.data.message, { position: 'bottom-right' });
                return res.data.product;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, { position: 'bottom-left' });
        }
    },
);

export const editProduct = createAsyncThunk(
    'product/editProduct',
    async ({ values, setOpen }) => {
        try {
            const res = await updateProduct(values);
            if (res.status === 200) {
                setOpen(false);
                toast.success(res.data.message, { position: 'bottom-right' });
                return res.data.product;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, { position: 'bottom-left' });
        }
    },
);

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (productId) => {
        try {
            const res = await removeProduct(productId);
            if (res.status === 200) {
                toast.success(res.data.message, { position: 'bottom-right' });
                return productId;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, { position: 'bottom-left' });
        }
    },
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProducts.fulfilled]: productAdaptor.setAll,
        [addProduct.fulfilled]: productAdaptor.addOne,
        [editProduct.fulfilled]: productAdaptor.setOne,
        [deleteProduct.fulfilled]: productAdaptor.removeOne,
    },
});

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
} = productAdaptor.getSelectors((state) => state.product);


export default productSlice.reducer;