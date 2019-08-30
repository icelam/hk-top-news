import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as newsActions from '@store/actions';
import NewsFeed from '@pages/NewsFeed';

const mapStateToProps = state => ({
  pageLoading: state.pageLoading,
  newsArticles: state.newsArticles,
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
