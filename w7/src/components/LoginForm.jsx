function LoginForm({ account, onInputChange, onLogin }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="mb-4">會員登入</h1>
        <form onSubmit={onLogin}>
          <div className="form-floating mb-3">
            <input
              name="username"
              value={account.username}
              onChange={onInputChange}
              type="email"
              className="form-control"
              id="username"
              placeholder="name@example.com"
            />
            <label htmlFor="username">請輸入 email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              name="password"
              value={account.password}
              onChange={onInputChange}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
            <label htmlFor="password">請輸入密碼</label>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            登入
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
