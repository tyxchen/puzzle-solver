interface Grid {
    rows: number;
    cols: number;
    contents: string[][];
}

class WordSearchSolver {
    protected grid: Grid;
    constructor(data: string | string[], rows: number, cols: number) {
        let grid: string[][] = [];

        this.grid.rows = rows;
        this.grid.cols = cols;
        this.grid.contents = [];

        if (Array.isArray(data) && !Array.isArray(data[0])) {
            // Assuming 1D array; each element is a row
            for (let i=0; i<data.length; i++) {
                grid.push(this.cellsToRow(data[i]));
            }
        } else if (!Array.isArray(data)) {
            // Assuming string
            let tempGrid: string[] = this.cellsToRow(data);

            // Slices the gigantic 1D array created into rows
            for (let i=0; i<rows; i++) {
                grid.push(tempGrid.slice(rows*i, rows*i+cols));
            }
        }

        this.grid.contents = grid;
    }
    private cellsToRow(cells: string): string[] {
        return cells.split("|").map(x => x.trim());
    }
}
