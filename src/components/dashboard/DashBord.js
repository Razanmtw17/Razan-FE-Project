import React from 'react'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ProductDashboard from './ProductDashboard';
import UserDahBoard from './UserDahBoard';
export default function DashBord({productList}) {
    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <div>
      <div className="pddescription">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Products" value="1" />
                <Tab label="Users" value="2" />
                <Tab label="Orders" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ProductDashboard productList={productList} />
            </TabPanel>
            <TabPanel value="2">
              <UserDahBoard />
            </TabPanel>
            <TabPanel value="3">
              <p></p>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}
