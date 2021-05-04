const fetcher = (prop: string): Promise<unknown> => fetch(prop).then((res) => res.json());

export default fetcher;
