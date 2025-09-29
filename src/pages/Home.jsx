import Spline from '@splinetool/react-spline';

const Home = () => {
    return (
        <section className='bg-[#e3e3e3]'>
            <div className="heightCustom relative">
                <Spline scene="https://prod.spline.design/DsgJsH3NwKwGCkRv/scene.splinecode" />
                <div className='absolute bottom-5 right-4 w-36 h-10 bg-[#e3e3e3]'></div>
            </div>
        </section>
    )
}

export default Home


