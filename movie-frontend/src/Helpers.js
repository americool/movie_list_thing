export function handleChange(key) {
  return function (e) {
    let state = {};
    state[key] = e.target.value;
    this.setState(state);
  }.bind(this);
}
