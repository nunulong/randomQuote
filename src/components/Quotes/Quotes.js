import React, { Component } from 'react';
import $ from 'jquery';
import { Div, H1, Button, FlexWrapper, Wrapper } from './Quote.style';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/fontawesome-free-solid';
import { faGithub } from '@fortawesome/fontawesome-free-brands';

class Quotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: [],
      color: ''
    };
  }

  componentDidMount() {
    this.fetchColor();
    this.fetchQuote();
  }

  fetchColor = () => {
    const randomColor = '#000000'.replace(/0/g, () => {
      return (~~(Math.random() * 16)).toString(16);
    });
    this.setState({ color: randomColor });
  };

  fetchQuote = async () => {

    const url = 'https://thesimpsonsquoteapi.glitch.me/quotes';
    const response = await fetch(url);

    if (response.status == 200) {
      const quote = await response.json();
      this.setState({ quote: quote[0] });
    } else {
      console.log('Error fetching quote');
    }

  };

  handleClick = () => {
    this.fetchQuote();
    this.fetchColor();
  };

  handleTweet = () => {
    window.open(
      `https://twitter.com/intent/tweet?hashtags=Quote&text="${this.state.quote.quote
      }" ${this.state.quote.character}`
    );
  };

  render() {
    document.body.setAttribute(
      'style',
      `background: ${this.state.color}; transition: background 2s ease;`
    );

    const style1 = this.state.color;
    const style2 = { margin: '2rem' };

    return (
      <Wrapper color={this.state.color}>
        <H1>Random Quote</H1>
        <Div>
          <div>
            <p>
              <FontAwesomeIcon icon={faQuoteLeft} />{' '}
              {this.state.quote.quote}{' '}
              <FontAwesomeIcon icon={faQuoteRight} />
            </p>
            <h3>{this.state.quote.character}</h3>
          </div>
          <FlexWrapper>
            <Button color={this.state.color} onClick={this.handleClick}>
              Quote Me
            </Button>
            <Button color={this.state.color} onClick={this.handleTweet}>
              Tweet Me
            </Button>
          </FlexWrapper>
        </Div>
        <a href="https://github.com/nunulong/randomQuote">
          <FontAwesomeIcon
            icon={faGithub}
            size="3x"
            style={Object.assign({}, { color: style1 }, style2)}
          />
        </a>
      </Wrapper>
    );
  }
}

export default Quotes;
