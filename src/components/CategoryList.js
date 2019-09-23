import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { fetchData, fetchProducts } from "../reducer/actions";
import Title from "./Title";
import Product from "./Product";
import StyledTab from '../styles/Styledtab';
import StyledTabs from '../styles/Styledtabs';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      <Box p={5}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`
  };
}



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ScrollableTabsButtonPrevent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const data = useSelector(state => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  if (data.isFetching) {
    return <div>Loading...</div>;
  }

  if (data.error) {
    return <p>Some error Occured</p>;
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const handleProduct = category_id => {
    dispatch(fetchProducts(category_id));
  };

  if (data.isFetched) {
    return (
      <div>
        <Title title={data.heading} />
        <div className={classes.root}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="off"
            aria-label="scrollable prevent tabs example"
          >
            {data.category_list.map((category, index) => (
              <StyledTab
                key={index}
                style={{
                  backgroundImage: `url(${category.category_image})`,
                  height: "65px",
                  width: "120px"
                }}
                icon={category.category_name}
                aria-label={category.category_name}
                {...a11yProps(0)}
                onClick={() => handleProduct(category.category_id)}
              />
            ))}
          </StyledTabs>
        </div>
        <Product products={data.product_list.products}></Product>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
