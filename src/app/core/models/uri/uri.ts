export class Uri {
    private readonly _uri: string

    constructor(baseUri: string) {
        this._uri = baseUri.replace(/\/$/, '') + '/'
    }

    public appendPath(path: string): Uri {
        if (
            path === undefined ||
            path === null ||
            path === '' ||
            path === '/'
        ) {
            return this
        }
        return new Uri(
            this._uri + path.replace(/^\/+/, '').replace(/\/+$/, '') + '/'
        )
    }

    public get(): string {
        return this._uri
    }
}
