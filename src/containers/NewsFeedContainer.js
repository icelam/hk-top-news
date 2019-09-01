import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as newsActions from '@store/actions';
import NewsFeed from '@pages/NewsFeed';

const mapStateToProps = state => ({
  pageLoading: state.pageLoading,
  pagination: state.pagination,
  newsArticles: state.newsArticles.filter(article => (
    article.source.name.toLowerCase().includes(state.keyword.toLowerCase())
    || article.title.toLowerCase().includes(state.keyword.toLowerCase())
    || article.description.toLowerCase().includes(state.keyword.toLowerCase())
  )),
  fetchError: state.fetchError
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(newsActions, dispatch)
});

const NewsFeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsFeed);

export default NewsFeedContainer;
