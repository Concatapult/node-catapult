var React = require('react');
var ReactDOM = require('react-dom');

// ReactDOM.render(
//   <h1>Hello, world!</h1>, // JSX
//   // React.createElement("h1", null, "Hello, world!"),
//   // m("h1", "Hello, world!"),
//   document.getElementById('app')
// );


var Waitlist = React.createClass({
  render: function () {
    return <div className="waitlist">
      {this.props.roster.map( person =>
        <div key={person.id} className="person">{ person.name }</div>
      )}
    </div>
  }
})

var WaitlistMgr = React.createClass({
  getInitialState: function () {
    return {
      people: [
        { id: 10, name: 'alice' },
        { id: 11, name: 'bob'}
      ],
      newPersonName: '[Type person name here]'
    }
  },

  setNewPersonName: function (e) {
    this.setState({ newPersonName: e.target.value })
  },

  add: function () {
    console.log("Adding new person:", this.state.newPersonName)
    this.state.people.push(
      { id: Math.round(Math.random() * 1000), name: this.state.newPersonName }
    )
  },

  render: function () {
    return <div className="waitlist-mgr">
      <Waitlist roster={this.state.people} />

      <input type="text"
        value={this.state.newPersonName}
        onChange={this.setNewPersonName} />

      <p>Add new person: {this.state.newPersonName}</p>
      <button onClick={this.add}>Add Person</button>
    </div>
  }
})

ReactDOM.render(
  <WaitlistMgr />,
  document.getElementById('app')
)
