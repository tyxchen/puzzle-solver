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
        grid.splice(0, 0, new Array<string>(cols+2).map(_ => WALL));
        grid.push(new Array<string>(cols+2).map(_ => WALL));

        // Insert into the grid property
        this.contents = grid;
    }
    private cellsToRow(cells: string): string[] {
        return cells.split("|").map(x => x.trim());
    }
}

class WordSearchSolver {
    private grid: WordSearch;
    private words: string[];
    private matches: any;

    constructor(grid: WordSearch, words: string[], options = {
        caseSensitive: true
    }) {
        // Implement options
        if (options.hasOwnProperty('caseSensitive') && options.caseSensitive === true) {
            grid.contents = grid.contents.map(a => {
                return a.map(b => b.toUpperCase());
            });
            words = words.map(w => w.toUpperCase());
        }

        this.grid = grid;
        this.words = words;
        this.matches = {};
    }
    public searchWord(row: number, col: number, match: string) {
        path: for (let r=-1;r<=1;r++) {
            for (let c=-1;c<=1;c++) {
                for (let w=0;w<match.length;w++) {
                    if (this.grid.contents[row+r*w][col+c*w] !== match[w]) {
                        break;
                    } else if (w === match.length && this.grid.contents[row+r*w][col+c*w] === match[w]) {
                        // Last character in the match and the found character matches
                        this.matches[match] = [row, col, r, c];
                        break path;
                    }
                }
            }
        }
    }
}
