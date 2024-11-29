

export default function Footer() {
  return (
    <footer>
    <div className="mt-12 relative pt-6">
        <img className="w-8 laptop:w-auto absolute inset-0 m-auto mr-12 z-10 -mt-4 laptop:-mt-8" src="https://cdn.tuk.dev/assets/templates/weCare/ball-large.png" />
        <img src="https://i.ibb.co/fC8BBxt/footer-bg-wecare.png" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="container relative z-10 mx-auto laptop:flex justify-between px-6 laptop:px-0 pt-8 laptop:pt-32 pb-6 laptop:pb-28">
            <div className="laptop:w-1/4 pb-12 laptop:pb-0">
                <img className="mb-8 w-10 h-10" src="logo.svg" alt="logo" />
                <p className="text-white text-xl">Four Elements Gujar Khan</p>
            </div>
            <div className="flex flex-row justify-between laptop:justify-end">
                <div className="laptop:pr-24 pb-12 laptop:pb-0">
                    <h3 className="mb-6 text-lg text-white font-bold">Links</h3>
                    <ul className="text-white">
                        <li className="mb-3"><a href="#">Products</a></li>
                        <li className="mb-3"><a href="#">Claims</a></li>
                        <li className="mb-3"><a href="#">Renewals</a></li>
                        <li><a href="#">Support</a></li>
                    </ul>
                </div>
                <div className="laptop:pr-24 pb-12 laptop:pb-0">
                    <h3 className="mb-6 text-lg text-white font-bold">Services</h3>
                    <ul className="text-white">
                        <li className="mb-3"><a href="#">Products</a></li>
                        <li className="mb-3"><a href="#">Claims</a></li>
                        <li className="mb-3"><a href="#">Renewals</a></li>
                        <li><a href="#">Support</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="laptop:pr-24 mb-6 text-lg text-white font-bold">About</h3>
                    <ul className="text-white">
                        <li className="mb-3"><a href="#">Products</a></li>
                        <li className="mb-3"><a href="#">Claims</a></li>
                        <li className="mb-3"><a href="#">Renewals</a></li>
                        <li><a href="#">Support</a></li>
                    </ul>
                </div>
            </div>
            <div className="laptop:w-1/4  flex laptop:justify-end items-end mt-12 laptop:mt-0">
                <div className="bg-white p-2 rounded-full mr-2.5">
                    <img src="https://cdn.tuk.dev/assets/templates/weCare/fb.png" />
                </div>
                <div className="bg-white p-2 rounded-full mr-2.5">
                    <img src="https://cdn.tuk.dev/assets/templates/weCare/twitter.png" />
                </div>
                <div className="bg-white p-2 rounded-full mr-2.5">
                    <img src="https://cdn.tuk.dev/assets/templates/weCare/yt.png" />
                </div>
            </div>
        </div>
    </div>
</footer>
  );
}
