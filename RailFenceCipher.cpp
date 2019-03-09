#include <iostream>
#include <string>
#include <vector>

std::string encode_rail_fence_cipher(std::string str, int n)
{
	if (str.empty())
		return "";

	std::vector<std::vector<char>> table(n);
	for (int j = 0; j < n; j++) {
		std::vector<char> a(str.size());
		for (size_t i = 0; i < str.size(); i++)
			a[i] = 0;
		table[j] = a;
	}

	int idx = 0;
	int order = 0; // 0:desc, 1:asc

	for (size_t i = 0; i < str.size(); ++i) {
		table[idx][i] = str.at(i);

		if (order == 0) {
			if (idx == n - 1) {
				order = 1;
				idx--;
			} else {
				idx++;
			}
		} else {
			if (idx == 0) {
				order = 0;
				idx++;
			} else {
				idx--;
			}
		}
	}

	std::string s { };

	for (int idx = 0; idx < n; idx++) {
		for (size_t i = 0; i < str.size(); ++i) {
			if (table[idx][i] != 0)
				s.push_back(table[idx][i]);
		}
	}

	return s;
}

std::string decode_rail_fence_cipher(std::string str, int n)
{
	if (str.empty())
		return "";

	std::vector<std::vector<char>> table(n);
	for (int j = 0; j < n; j++) {
		std::vector<char> a(str.size());
		for (size_t i = 0; i < str.size(); i++)
			a[i] = 0;
		table[j] = a;
	}

	int idx = 0;
	int order = 0; // 0:desc, 1:asc

	for (size_t i = 0; i < str.size(); ++i) {
		table[idx][i] = 1;

		if (order == 0) {
			if (idx == n - 1) {
				order = 1;
				idx--;
			} else {
				idx++;
			}
		} else {
			if (idx == 0) {
				order = 0;
				idx++;
			} else {
				idx--;
			}
		}
	}

	int j = 0;

	for (int idx = 0; idx < n; idx++) {
		for (size_t i = 0; i < str.size(); ++i) {
			if (table[idx][i] == 1) {
				table[idx][i] = str.at(j);
				j++;
			}
		}
	}

	std::string s { };
	idx = 0;
	order = 0;

	for (size_t i = 0; i < str.size(); ++i) {
		s.push_back(table[idx][i]);

		if (order == 0) {
			if (idx == n - 1) {
				order = 1;
				idx--;
			} else {
				idx++;
			}
		} else {
			if (idx == 0) {
				order = 0;
				idx++;
			} else {
				idx--;
			}
		}
	}

	return s;
}

int main()
{
	std::string s { "WEAREDISCOVEREDFLEEATONCE" };
	std::string encoded = encode_rail_fence_cipher(s, 3);
	std::cout << "Encoded: " << encoded << std::endl;

	std::string s1 { "WECRLTEERDSOEEFEAOCAIVDEN" };
	std::string decoded = decode_rail_fence_cipher(s1, 3);
	std::cout << "Decoded: " << decoded << std::endl;
}
