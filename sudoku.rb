require 'pry'

basic_puzzle = [
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    [ 4, 5, 6, 7, 8, 9, 1, 2, 3 ],
    [ 7, 8, 9, 1, 2, 3, 4, 5, 6 ],
    [ 2, 3, 1, 5, 6, 4, 8, 9, 7 ],
    [ 5, 6, 4, 8, 9, 7, 2, 3, 1 ],
    [ 8, 9, 7, 2, 3, 1, 5, 6, 4 ],
    [ 3, 1, 2, 6, 4, 5, 9, 7, 8 ],
    [ 6, 4, 5, 9, 7, 8, 3, 1, 2 ],
    [ 9, 7, 8, 3, 1, 2, 6, 4, 5 ]
]

def swap_two_digits( row, this_digit, that_digit )
    row.map do | element |
        if ![ this_digit, that_digit ].include?( element )
            element = element == this_digit ? that_digit : this_digit
        end
    end
end

def shuffle( puzzle )
    two_random_digits = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].sample( 2 )
end

binding.pry
false