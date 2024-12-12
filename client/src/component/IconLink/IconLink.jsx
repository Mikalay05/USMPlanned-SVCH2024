export default function IconLink({pathImg, link}) {
    return (
        <a href={link}>
            <img src={`/${pathImg}`} alt={link}/>
        </a>
    )
}