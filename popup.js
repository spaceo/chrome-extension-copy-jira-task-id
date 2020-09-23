
function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

document.addEventListener('DOMContentLoaded', function() {
    const status = document.getElementById('status');
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        const tabUrl = tabs[0].url;
        const jiraTaskIdMatch = tabUrl.match(/selectedIssue=([A-Z][A-Z0-9]*-[0-9]+)/);

        if (!jiraTaskIdMatch || jiraTaskIdMatch[1] === undefined) {
            status.innerHTML = 'No jira task id was found';
            return;
        }

        const jiraTaskId = jiraTaskIdMatch[1];
        copyToClipboard(jiraTaskId);

        status.innerHTML = `Jira task Id: <span class="what-was-copied">"${jiraTaskId}"</span> has been copied to your clipboard`;
    });
}, false);
