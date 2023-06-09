import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetStore } from '../redux/actions/index';
import '../styles/Ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      arrayRanking: [],
    };
  }

  componentDidMount() {
    const arrayRanking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ arrayRanking });
  }

  goTheHome = () => {
    const { history, dispatch } = this.props;
    dispatch(resetStore());
    history.push('/');
  };

  render() {
    const { arrayRanking } = this.state;
    if (!arrayRanking) {
      return (
        <>
          <h1 data-testid="ranking-title">Ranking</h1>
          <p>Nenhuma pontuação cadastrada</p>
        </>
      );
    }
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div className="main-ranking">
          <div className="ranking-container">
            <ul>
              {
                arrayRanking.map((rank, index) => (
                  <li key={ index } className={ `li-${index}` }>
                    <p data-testid={ `player-name-${index}` }>{rank.name}</p>
                    <p data-testid={ `player-score-${index}` }>{rank.score}</p>
                    <img src={ rank.picture } alt={ rank.name } />
                    <hr />
                  </li>
                ))
              }
            </ul>
            <button
              data-testid="btn-go-home"
              onClick={ this.goTheHome }
            >
              Home
            </button>
          </div>
        </div>

      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
