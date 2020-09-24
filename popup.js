
function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function statusMessage(jiraTaskId) {
    return `Jira task Id: <span class="what-was-copied">"${jiraTaskId}"</span> has been copied to your clipboard`;
}

document.addEventListener('DOMContentLoaded', function() {
    const status = document.getElementById('status');
    status.innerHTML = 'No project or task id was found';

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        const tabUrl = tabs[0].url;
        const projectAndTaskIdMatch = tabUrl.match(/browse\/([A-Z][A-Z0-9]*-[0-9]+)|selectedIssue=([A-Z][A-Z0-9]*-[0-9]+)/);

        if (!projectAndTaskIdMatch) {
            status.innerHTML = 'No jira task id was found';
            return;
        }

        if (
            projectAndTaskIdMatch
            && projectAndTaskIdMatch[1] !== undefined
            && projectAndTaskIdMatch[2] === undefined
        ) {
            copyToClipboard(projectAndTaskIdMatch[1]);
            status.innerHTML = statusMessage(projectAndTaskIdMatch[1])
        }

        if (
            projectAndTaskIdMatch
            && projectAndTaskIdMatch[1] === undefined
            && projectAndTaskIdMatch[2] !== undefined
        ) {
            copyToClipboard(projectAndTaskIdMatch[2]);
            status.innerHTML = statusMessage(projectAndTaskIdMatch[2])
        }

        return true;
    });
}, false);
