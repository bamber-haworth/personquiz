export const handleData = (val: any) => {
    return Object.entries(val)
      .map((e, i) => {
        return e[1];
      })
      .reduce((p = [], c) => {
        if (c === "yes") {
          // @ts-ignore
          p.push(c);
        }
        return p;
      }, []);
  };
