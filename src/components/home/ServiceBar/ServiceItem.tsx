type Props = {
    icon: string;
    title: string;
    desc: string;
};

function ServiceItem({icon, title, desc}: Props){
    return (
        <div>
            <img src={icon} alt={title} width={40} />
            <div>
                <h4>{title}</h4>
                <p>{desc}</p>
            </div>
        </div>
    );
}
export default ServiceItem;