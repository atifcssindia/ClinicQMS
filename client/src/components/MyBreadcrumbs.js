import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import { Link, Typography } from "@mui/material";

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
  const { component: Component = Link, href, label, ...other } = props;

  return (
    <Typography component="div">
      <Component href={href} {...other}>
        {label}
      </Component>
    </Typography>
  );
}
