import image from "./img/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.webp"

function Footer() {
    return (
        <footer className="bg-light text-dark py-3 rounded fixed-bottom">
            <div className="container">
                <div className="row">
                    <div style={{ backgroundImage: `url(${image})`, backgroundSize: "contain" }}>
                        <div className="col-12 text-center text-black">
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;