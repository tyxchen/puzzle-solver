const WALL: string = " ";

interface Grid {
    rows: number;
    cols: number;
    contents: Array<string|number>[];
}

class WordSearch implements Grid {
    rows: number;
    cols: number;
    contents: Array<string>[];

    constructor(data: string | string[], rows: number, cols: number) {
        let grid: string[][] = [];

        this.rows = rows;
        this.cols = cols;
        this.contents = [];

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

        // Set hard limits on the grid
        for (let r of grid) {
            r.splice(0, 0, WALL);
            r.push(WALL);
        }
        grid.splice(0, 0, new Array(cols+2).map(_ => WALL));
        grid.push(new Array(cols+2).map(_ => WALL));

        // Insert into the grid property
        this.contents = grid;
    }
    private cellsToRow(cells: string): string[] {
        return cells.split("|").map(x => x.trim());
    }
}

class WordSearchSolver {
    protected grid: WordSearch;
    private words: string[];
    private matches: number[][];
    constructor(grid: WordSearch, words: string[]) {
        this.grid = grid;
        this.words = words;
        this.matches = [];
    }
    public searchWord(row: number, col: number, dir: { r: number, c: number }, match: string) {
        let matchSlice: string = match;

        for (let r=-1;r<=1;r++) {
            for (let c=-1;c<=1;c++) {
                for (let w of matchSlice) {
                    if (this.grid.contents[row+r][col+c] !== w) {
                        break;
                    } else if (w === matchSlice.slice(-1) && this.grid.contents[row+r][col+c] === w) {
                        // Last character in the match and the found character matches
                        this.matches.push([row, col, r, c]);
                    }
                }
            }
        }
    }
}
