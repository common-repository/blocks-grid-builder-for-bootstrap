import { Path, SVG } from '@wordpress/components';
import { FaTabletAlt } from "@react-icons/all-files/fa/FaTabletAlt";
import { FaMobileAlt } from "@react-icons/all-files/fa/FaMobileAlt";
import { FaDesktop } from "@react-icons/all-files/fa/FaDesktop";
import { FaLaptop } from "@react-icons/all-files/fa/FaLaptop";
import { BsPhoneLandscape } from "@react-icons/all-files/bs/BsPhoneLandscape";

export const desktop = ( <FaDesktop /> );

export const laptop = ( <FaLaptop />);

export const tablet = ( <FaTabletAlt /> );

export const tabletSmall = <SVG role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -9.000000) translate(3.000000, -3.000000)"><Path d="M16,24 C17.104,24 18,23.104 18,22 L18,2 C18,0.896 17.104,0 16,0 L2,0 C0.896,0 0,0.896 0,2 L0,22 C0,23.104 0.896,24 2,24 L16,24 Z M2,21 L2,3 L16,3 L16,21 L2,21 Z M8.5,22.5 C8.5,22.224 8.724,22 9,22 C9.276,22 9.5,22.224 9.5,22.5 C9.5,22.776 9.276,23 9,23 C8.724,23 8.5,22.776 8.5,22.5 Z"></Path></g></SVG>;

export const mobile = ( <FaMobileAlt /> );

