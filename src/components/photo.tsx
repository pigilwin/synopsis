import Me from '../assets/me.jpg';

export const Photo = (): JSX.Element => {
    return (
        <div id="photo" className="w-full lg:w-2/5 mx-auto mt-4">
            <img src={Me} className="rounded-full border-4 border-black dark:border-white" alt="Me"/>
        </div>
    );
}