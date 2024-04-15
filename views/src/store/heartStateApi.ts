import axios from 'axios';
const heartAdd = async (title: string) => {
  const res = await axios.post(
    `${process.env.REACT_APP_DB_HOST}/user/itemAdd`,
    {
      title,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('oneroomToken')}`,
      },
    }
  );
};
const heartDel = async (title: string) => {
  const res = await axios.post(
    `${process.env.REACT_APP_DB_HOST}/user/itemDel`,
    {
      title,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('oneroomToken')}`,
      },
    }
  );
};

export { heartAdd, heartDel };
