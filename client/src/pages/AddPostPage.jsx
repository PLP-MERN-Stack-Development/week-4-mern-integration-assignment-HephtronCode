import PostForm from "@/components/PostForm";

const AddPostPage = () => { 
    return (
        <section className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">Create a New Post</h1>
            <PostForm />
        </section>
    );
}

export default AddPostPage;
