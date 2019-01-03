const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, or xoxb)
const token = 'xo...';

const web = new WebClient(token);

function getAllChannels() {
  // See: https://api.slack.com/methods/conversations.list#arguments
  const param = {
    exclude_archived: true,
    types: 'public_channel',
    // Only get first 100 items
    limit: 100
  };
  return web.conversations.list(param).then(results => { return results.channels });
}

getAllChannels()
  .then(console.log)  // prints out the list of channels
  .catch(console.error);
