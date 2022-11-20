import Link from "next/link";

const NavMenu = () => (
  <ul className="list-reset lg:flex justify-end flex-1 items-center space-x-2 lg:mr-4">
    <li>
      <Link
        prefetch={false}
        href="/"
        className="inline-block py-2 px-4 text-black font-bold no-underline"
      >
        Home
      </Link>
    </li>
    <li>
      <Link
        prefetch={false}
        href="/developers"
        className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
      >
        For Developers
      </Link>
    </li>
    <li>
      <Link
        prefetch={false}
        href="/marketers"
        className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
      >
        For Marketers
      </Link>
    </li>
    <li>
      <Link
        prefetch={false}
        href="/registration"
        className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
      >
        Registration
      </Link>
    </li>
    <li>
      <Link
        prefetch={false}
        href="/?utm_campaign=unfrmconf"
        className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
      >
        Campaign
      </Link>
    </li>
  </ul>
);

export default NavMenu;
