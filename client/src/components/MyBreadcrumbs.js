import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import { Link, ListItemIcon, Typography } from "@mui/material";

export default function MyBreakcrumbs({ data }) {
  return (
    <Stack spacing={2}>
      <Breadcrumbs aria-label="breadcrumb">
        {data.map((item, index) => (
          <StyledBreadcrumb
            key={index}
            component="a"
            href={item.href}
            label={item.label}
            icon={item.icon}
            deleteIcon={item.deleteIcon}
            onDelete={item.onDelete}
            style={{ color: item.color }} // Use style instead of sx
            class={item.class}
          />
        ))}
      </Breadcrumbs>
    </Stack>
  );
}

function StyledBreadcrumb(props) {
  const {
    component: Component = Link,
    href,
    label,
    icon: Icon,
    ...other
  } = props;

  return (
    <Typography component="div" className="flex items-center">
      <Component href={href} {...other} className=" inline-flex items-center">
        {Icon && (
          <ListItemIcon className="mr-1 !min-w-[25px] text-xl  ">
            <Icon />
          </ListItemIcon>
        )}
        <span className="hidden md:inline text-sm">{label}</span>
      </Component>
    </Typography>
  );
}
