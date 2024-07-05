import React, { useState } from 'react';
import { departments } from '../data/departments';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (department: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [department]: !prevOpen[department] }));
  };

  const handleSelectDepartment = (department: string) => {
    const isSelected = !selected[department];
    const updatedSelected = { ...selected, [department]: isSelected };

    const subDepartments = departments.find((dept) => dept.department === department)?.sub_departments || [];
    subDepartments.forEach((sub) => {
      updatedSelected[sub] = isSelected;
    });

    setSelected(updatedSelected);
  };

  const handleSelectSubDepartment = (department: string, subDepartment: string) => {
    const isSelected = !selected[subDepartment];
    const updatedSelected = { ...selected, [subDepartment]: isSelected };

    const parentDepartment = departments.find((dept) => dept.department === department);
    const allSelected = parentDepartment?.sub_departments.every((sub) => updatedSelected[sub]);

    updatedSelected[department] = allSelected;

    setSelected(updatedSelected);
  };

  return (
    <Box mt={5} width="100%">
      <List>
        {departments.map((department) => (
          <React.Fragment key={department.department}>
            <ListItem button onClick={() => handleToggle(department.department)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={!!selected[department.department]}
                  tabIndex={-1}
                  disableRipple
                  onChange={() => handleSelectDepartment(department.department)}
                />
              </ListItemIcon>
              <ListItemText primary={department.department} />
              <IconButton edge="end">
                {open[department.department] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            <Collapse in={open[department.department]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {department.sub_departments.map((sub, index) => (
                  <ListItem key={index} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={!!selected[sub]}
                        tabIndex={-1}
                        disableRipple
                        onChange={() => handleSelectSubDepartment(department.department, sub)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={sub} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default DepartmentList;
