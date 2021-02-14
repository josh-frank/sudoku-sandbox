/*
function shuffle( array ) {
    for ( let i = array.length - 1; i > 0; i-- ) {
        const j = Math.floor( Math.random() * ( i + 1 ) );
        [ array[ i ], array[ j ] ] = [ array[ j ], array[ i ] ];
    }
    return array;
}

function populatedRegion() {
    const shuffleDigits = shuffle( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] );
    return [ shuffleDigits.slice( 0, 3 ), shuffleDigits.slice( 3, 6 ), shuffleDigits.slice( 6 ) ];
}

function emptyRegion() {
    return [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];
}

function startingPuzzle() {
    const startingQuadrant1 = populatedRegion(), startingQuadrant2 = populatedRegion(), startingQuadrant3 = populatedRegion();
    const firstThreeRows =  startingQuadrant1.map( ( row, index ) => { return row.concat( emptyRegion()[ index ] ).concat( emptyRegion()[ index ] ) } );
    const secondThreeRows =  emptyRegion().map( ( row, index ) => { return row.concat( startingQuadrant2[ index ] ).concat( emptyRegion()[ index ] ) } );
    const thirdThreeRows =  emptyRegion().map( ( row, index ) => { return row.concat( emptyRegion()[ index ] ).concat( startingQuadrant3[ index ] ) } );
    return firstThreeRows.concat( secondThreeRows ).concat( thirdThreeRows );
}

function populate( puzzle ) {
    for ( const row of [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] ) {
        for ( const column of [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] ) {
            if ( !puzzle[ row ][ column ] ) {
                let thisRow = puzzle[ row ];
                let thisColumn = puzzle.map( row => row[ column ] );
                let thisRegion = puzzle[ Math.floor( row / 3 ) * 3 ].slice( Math.floor( column / 3 ) * 3, ( Math.floor( column / 3 ) * 3 ) + 3 );
                thisRegion = thisRegion.concat( puzzle[ ( Math.floor( row / 3 ) * 3 ) + 1 ].slice( Math.floor( column / 3 ) * 3, ( Math.floor( column / 3 ) * 3 ) + 3 ) );
                thisRegion = thisRegion.concat( puzzle[ ( Math.floor( row / 3 ) * 3 ) + 2 ].slice( Math.floor( column / 3 ) * 3, ( Math.floor( column / 3 ) * 3 ) + 3 ) );
                let alreadyChosenDigits = [ ...new Set( thisRow.concat( thisColumn ).concat( thisRegion ) ) ].filter( digit => !!digit );
                let possibleDigits = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].filter( digit => !alreadyChosenDigits.includes( digit ) );
                puzzle[ row ][ column ] = possibleDigits[ Math.floor( Math.random() * possibleDigits.length ) ];
            }
        }
    }
}

function grille( numberOfHoles ) {
    return shuffle( Array( numberOfHoles ).fill( true ).concat( Array( 81 - numberOfHoles ).fill( false ) ) );
}

function poke( puzzle, grille ) {
    const flattenedAndPoked = puzzle.flat().map( ( digit, index ) => grille[ index ] ? 0 : digit );
    result = [];
    for ( let i = 0; i < 81; i += 9 ) { result.push( flattenedAndPoked.slice( i, i + 9 ) ) }
    return result;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

let solution = [ undefined ];
while ( solution.flat().includes( undefined ) ) {
    solution = startingPuzzle();
    populate( solution );
}
let board = poke( solution, grille( 32 ) );
for ( const row of [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] ) {
    for ( const column of [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] ) {
        if ( !!board[ row ][ column ] ) {
            allCells[ row ][ column ].firstElementChild.classList.add( "clue" );
            allCells[ row ][ column ].firstElementChild.disabled = true;
            allCells[ row ][ column ].firstElementChild.value = board[ row ][ column ]
        }
    }
}
*/

const allCells = [
    [ ...document.querySelector( '[data-row="0"]' ).getElementsByTagName( "td" ) ],
    [ ...document.querySelector( '[data-row="1"]' ).getElementsByTagName( "td" ) ],
    [ ...document.querySelector( '[data-row="2"]' ).getElementsByTagName( "td" ) ],
    [ ...document.querySelector( '[data-row="3"]' ).getElementsByTagName( "td" ) ],
    [ ...document.querySelector( '[data-row="4"]' ).getElementsByTagName( "td" ) ],
    [ ...document.querySelector( '[data-row="5"]' ).getElementsByTagName( "td" ) ],
    [ ...document.querySelector( '[data-row="6"]' ).getElementsByTagName( "td" ) ],
    [ ...document.querySelector( '[data-row="7"]' ).getElementsByTagName( "td" ) ],
    [ ...document.querySelector( '[data-row="8"]' ).getElementsByTagName( "td" ) ],
]

function peers( puzzle, row, column) {
    let result = puzzle[ row ];
    const topLeftCorner = [ Math.floor( row / 3 ) * 3, Math.floor( column / 3 ) * 3];
    result = result.concat( puzzle.map( row => row[ column ] ) );
    result = result.concat( [ puzzle[ topLeftCorner[ 0 ] ][ topLeftCorner[ 1 ] ],
        puzzle[ topLeftCorner[ 0 ] ][ topLeftCorner[ 1 ] + 1 ],
        puzzle[ topLeftCorner[ 0 ] ][ topLeftCorner[ 1 ] + 2 ],
        puzzle[ topLeftCorner[ 0 ] + 1 ][ topLeftCorner[ 1 ] ],
        puzzle[ topLeftCorner[ 0 ] + 1 ][ topLeftCorner[ 1 ] + 1 ],
        puzzle[ topLeftCorner[ 0 ] + 1 ][ topLeftCorner[ 1 ] + 2 ],
        puzzle[ topLeftCorner[ 0 ] + 2 ][ topLeftCorner[ 1 ] ],
        puzzle[ topLeftCorner[ 0 ] + 2 ][ topLeftCorner[ 1 ] + 1 ],
        puzzle[ topLeftCorner[ 0 ] + 2 ][ topLeftCorner[ 1 ] + 2 ] ] );
    return [ ...new Set( result ) ];
}

function clearHighlight() {
    allCells.flat().forEach( cell => cell.classList.remove( "highlight" ) );
}

function handleDomClick( documentClick ) {
    if ( documentClick.target.tagName != "INPUT" ) { clearHighlight(); }
}

function highlightCellPeers( cellClick ) {
    if ( cellClick.target.tagName === "INPUT" ) {
        clearHighlight();
        peers( allCells, parseInt( cellClick.target.closest( "tr" ).dataset.row ), parseInt( cellClick.target.dataset.column ) ).forEach( peer => peer.classList.add( "highlight" ) );
    }
}

document.addEventListener( "DOMContentLoaded", () => {
    document.addEventListener( "click", handleDomClick );
    document.getElementById( "sudoku-board" ).addEventListener( "click", highlightCellPeers );
} );
