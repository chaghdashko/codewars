def reverse_on_diagonals(matrix):
    diag_first = []
    for i in range(len(matrix)):
        diag_first.append(matrix[i][i])

    diag_second = []
    i = 0
    j = len(matrix)-1
    while True:
        diag_second.append(matrix[i][j])
        i = i+1
        j = j-1

        if i == len(matrix):
            break

    diag_first.reverse()
    diag_second.reverse()

    for i in range(len(matrix)):
        matrix[i][i] = diag_first[i]

    i = 0
    j = len(matrix)-1
    while True:
        matrix[i][j] = diag_second[i]
        i = i+1
        j = j-1

        if i == len(matrix):
            break

    return matrix


m = [[1, 2, 3],
     [4, 5, 6],
     [7, 8, 9]]
print(reverse_on_diagonals(m))
