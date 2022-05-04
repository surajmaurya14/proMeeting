import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
    const router = useRouter();

    return (
        <>
            <ToastContainer autoClose={2000} />
            <Head>
                <title>proMeet</title>
                <meta
                    name="description"
                    content="proMeet is an online video chat Web Application that can be used by anyone from around the globe"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {router.pathname === "/[id]" ? (
                <>
                    <main className="min-h-fullView">{children}</main>
                </>
            ) : (
                <>
                    <Navbar currentPath={router.pathname} />
                    <main className="min-h-fullView">{children}</main>
                    <Footer />
                </>
            )}
        </>
    );
};

export default Layout;
