import { Breadcrumbs, Link } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Breadcrumb = () => {
  const location = useLocation();

  const [paths, setPaths] = useState<Array<any>>([]);

  useLayoutEffect(() => {
    const pathStr = location?.pathname?.split("control/")[1];
    const pathNames = Array.from(new Set(pathStr?.split("/")));
    const paths = pathNames?.map((p: string) => {
      const name = p
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (match: any) => match.toUpperCase());
      return {
        name: name,
        path: `${location?.pathname?.split(p)[0]}${p}`,
      };
    });
    setPaths(paths);
  }, [location]);

  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  return (
    <div role="presentation" onClick={() => {}}>
      <Breadcrumbs aria-label="breadcrumb">
        {paths?.map((p: any, index) => (
          <Link
            sx={{ cursor: "pointer" }}
            key={index}
            underline="hover"
            color={index === paths?.length - 1 ? "text.primary" : "inherit"}
            onClick={() => handleLinkClick(p?.path)}
          >
            {p?.name}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};
