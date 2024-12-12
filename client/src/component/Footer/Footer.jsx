import IconLink from "../IconLink/IconLink";
import "./Footer.css";

const arrIcon = [
  {
    iconName: "IconGitHub.svg",
    link: "https://github.com/Mikalay05/USMPlanned-SVCH2024",
  },
  {
    iconName: "IconEmail.svg",
    link: "mailto:kicluk@bk.ru",
    isEmail: true,
  },
  {
    iconName: "IconFigma.svg",
    link: "https://www.figma.com/design/eDIcZEx7QyklRovia9pELF/Untitled?node-id=32-282&t=C7C1OQQOZTbAQEdu-1",
  },
  {
    iconName: "IconTG.svg",
    link: "https://t.me/KitKatAmAm",
  },
];

export default function Footer({ nameMainIcon = "MainIcon.svg" }) {
  return (
    <footer>
      <img src={nameMainIcon} alt="Main Icon" />
      <div className="footer-content">
        <div className="text-content-in-footer">
          <p>© 2024 Кислюк Николай Александрович</p>
          <p>Все права защищены.</p>
          <span>
            <a href="">Политика конфиденциальности</a> | 
            <a href=""> Условия использования</a>
          </span>
        </div>
        <div className="icon-content-in-footer">
          {arrIcon.map((item) => (
            <IconLink
              key={item.link} 
              pathImg={item.iconName}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}