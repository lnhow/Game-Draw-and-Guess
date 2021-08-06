import { useSelector } from 'react-redux';

const User = () => {
  const User = useSelector((state) => state.user);

  return (
    <div>
      <form>
        <input readOnly value={User.username}></input>
        <input
          type="password"
          placeholder="Password"
          value={User.password}
          readOnly
        ></input>
        <input disabled placeholder="Email@gmail.com"></input>
        <img src={User.avatar} alt="" />
      </form>
    </div>
  );
};

export default User;
