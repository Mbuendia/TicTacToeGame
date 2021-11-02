import React, { useEffect } from 'react';
import withStyles from 'react-jss';
import classNames from 'classnames';

const Index = ({ classes }) => {
  useEffect(() => {
  }, []);

  const { clickCounter } = useSelector(s => s.counter);

  return (
    <div className={classes.container}>
      <span
        className={classNames(classes.number, {
          [classes.zero]: clickCounter === 0,
        })}
      >
        {clickCounter}
      </span>
    </div>
  );
};


export default withStyles(styles)(Index);
