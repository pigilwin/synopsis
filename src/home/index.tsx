import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { 
    Photo,
    Briefcase, 
    GitHub,
    Instagram,
    LinkedIn
} from "../components/components";
import { Proficiency } from "./proficiency";

export const Home = (): JSX.Element => {
    return (
        <div className="max-w-4xl flex items-center h-auto flex-wrap mx-auto">
            <Photo/>
            <div id="profile" className="w-full rounded-lg shadow-2xl bg-white opacity-75 my-4">
                <div className="p-4 md:p-12 text-center lg:text-left">
                    <h1 className="text-3xl font-bold pt-8 lg:pt-0">Tim Remnant</h1>
                    <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-teal-500 opacity-25"></div>
                    <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                        <Briefcase/>
                        Software Developer
                    </p>
                    <Link to="/blog">
                        <p className="pt-4 text-base font-bold">Blog</p>
                    </Link>
                    <Links/>
                </div>
            </div>
            <div className="w-full rounded-lg shadow-2xl bg-white opacity-75 my-4">
                <h1 className="text-center p-4 text-2xl">Technologies</h1>
                <Proficiency/>
            </div>
        </div>
    );
}

const Links = (): JSX.Element => {

    interface LinkProps {
        link: string;
    }
    const Link = ({link, children}: PropsWithChildren<LinkProps>): JSX.Element => {
        return (
            <a href={link} rel="noreferrer" target="_blank" className="link">
                {children}
            </a>
        );
    }    

    return (
        <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between">
            <Link link="https://github.com/pigilwin">
                <GitHub/>
            </Link>
            <Link link="https://www.instagram.com/timremnant">
                <Instagram/>
            </Link>
            <Link link="https://www.linkedin.com/in/tim-remnant-420094106/">
                <LinkedIn/>
            </Link>
        </div>
    );
}