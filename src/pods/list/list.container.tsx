import React from 'react';
import { Button, TextField, List } from '@mui/material';
import { envConstants } from '../../core/constants/env.constants';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const ListContainer: React.FC = () => {
  const PAGE_SIZE = 3;
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [filter, setFilter] = React.useState<string>(envConstants.ORGANIZATION);
  const [page, setPage] = React.useState(1);
  const [totalElements, setTotalElements] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const navigate = useNavigate();

  const getMembers = () => {
    fetch(`https://api.github.com/orgs/${filter}/members`)
      .then((response) => response.json())
      .then((json) => {
        if (!json.message) {
          setMembers(json);
          setTotalElements(json.length);
        } else {
          setMembers([]);
          setTotalElements(0);
        }
        setPage(1);
      })
      .catch((error) => alert(error.message));
  };

  React.useEffect(() => {
    getMembers();
  }, []);

  const handleOnClick = () => {
    getMembers();
  };

  const showItem = (index: number): boolean => {
    const initialIndex = (page - 1) * PAGE_SIZE;
    const lastIndex = PAGE_SIZE * page - 1;
    return index >= initialIndex && index <= lastIndex;
  };

  return (
    <>
      <h1>Hello from List page</h1>
      <div className="search-container">
        <TextField
          id="standard-basic"
          label="Organization"
          variant="standard"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <Button variant="text" onClick={handleOnClick} className="btn-search">
          Search
        </Button>
      </div>

      <List>
        {members.length === 0 ? (
          <Alert variant="outlined" severity="warning">
            {' '}
            Not Found{' '}
          </Alert>
        ) : (
          members.map(
            (member, index) =>
              showItem(index) && (
                <>
                  <ListItem key={member.id} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={() => navigate(`/detail/${member.login}`)}
                    >
                      <ListItemAvatar>
                        <Avatar alt={member.login} src={member.avatar_url} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={member.login}
                        secondary={<Typography>{member.id}</Typography>}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              )
          )
        )}
      </List>
      <Pagination
        count={Math.trunc(totalElements / PAGE_SIZE)}
        onChange={handleChange}
      />
    </>
  );
};
