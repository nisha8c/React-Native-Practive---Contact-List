import app from './app';
const port = 8000;

app.listen(port, (): void => {
    console.log(`Example app listening on port ${port}`);
});