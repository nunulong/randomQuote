import React, { Component } from "react";
import $ from "jquery";
import { Div, H1, Button, FlexWrapper, Wrapper } from "./Quote.style";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/fontawesome-free-solid';
import { faGithub } from '@fortawesome/fontawesome-free-brands';

class Quotes extends Component {
  constructor() {
    super();
    this.state = {
      quote: [],
      color: ""
    };
  }

  componentDidMount() {
    this.fetchColor();
    this.fetchQuote();
  }

  fetchColor = () => {
    $.ajax({
      url: "//www.colr.org/json/color/random",
      dataType: "json"
    })
      .done(response => {
        this.setState({
          color: response.colors[0].hex
        });
      })
      .fail((jqxhr, textStatus, err) => {
        console.log(`Request Failed: ${textStatus}, ${err}`);
      });
  };

  fetchQuote = () => {
    $.ajax({
      url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      }
    })
      .done(response => {
        this.setState({
          quote: response
        });
      })
      .fail((jqxhr, textStatus, err) => {
        console.log(`Request Failed: ${textStatus}, ${err}`);
      });
  };

  handleClick = () => {
    this.fetchQuote();
    this.fetchColor();
  };

  handleTweet = () => {
    window.open(
      `https://twitter.com/intent/tweet?hashtags=Quote&text="${
        this.state.quote.quoteText
      }" ${this.state.quote.quoteAuthor}`
    );
  };

  render() {
    document.body.setAttribute(
      'style', `background: #${this.state.color}; transition: background 2s ease;`
    );

    const style1 = !this.state.color ? { color: "black" } : { color: "white" };
    const style2 = { margin: "2rem" };

    return (
      <Wrapper color={this.state.color}>
        <H1 color={!this.state.color ? '000' : 'fff'}>Random Quote</H1>
        <Div color={this.state.color}>
          <div>
            <p><FontAwesomeIcon icon={faQuoteLeft} /> {this.state.quote.quoteText} <FontAwesomeIcon icon={faQuoteRight} /></p>
            <h3>{this.state.quote.quoteAuthor}</h3>
          </div>
          <FlexWrapper>
            <Button color={!this.state.color ? '000' : this.state.color} onClick={this.handleClick}>Quote Me</Button>
            <Button color={!this.state.color ? '000' : this.state.color} onClick={this.handleTweet}>Tweet Me</Button>
          </FlexWrapper>
        </Div>
        <a href="https://github.com/nunulong/randomQuote"><FontAwesomeIcon icon={faGithub} size="3x" style={Object.assign({}, style1, style2)} /></a>
      </Wrapper>
    );
  }
}

export default Quotes;
