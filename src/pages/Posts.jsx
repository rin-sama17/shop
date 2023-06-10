import { Post, PostsSlider } from '../components/posts'
import { useGetPostsQuery } from '../api'
import { PostLoading } from '../components/loading'

const Posts = () => {
  const { data = { posts: [] }, isSuccess } = useGetPostsQuery()
  if (!isSuccess) {
    return <PostLoading />
  }
  return (
    <>
      <PostsSlider />
      {data.posts.map((post, index) => (
        <Post postId={post.id} key={index} />
      ))}
    </>
  )
}
export default Posts
