export default function copyToClipboard(team){
    const string = team.convertToString();
    navigator.clipboard.writeText(string)
    .then(() => {
        window.alert("Team copied to clipboard!")
    })
    .catch(err => {
        console.log(err);
        window.alert("Error copying team to the clipboard.")
    })
}