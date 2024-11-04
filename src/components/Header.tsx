import Logo from "../assets/images/boxful-logo.png";

export const Header = () => {
  return (
    <header className="flex p-2 bg-white h-[80px] items-center">
      <img className="max-h-[40.11px]" src={Logo} alt="Boxful Logo" />
      <div className="h-[43px] w-[2px] bg-[#DDDDDD] mx-6 mt-[-5px]"></div>
    </header>
  );
};
