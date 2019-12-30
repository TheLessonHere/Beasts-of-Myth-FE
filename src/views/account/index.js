import React from 'react';
import {
    Typography
} from '@material-ui/core';

function Account(props) {
  const { accountData } = props;

  return (
    <div>
        <Typography>
            {accountData.username}
            <br/>
            {accountData.record}
        </Typography>
    </div>
  );
}

export default Account;