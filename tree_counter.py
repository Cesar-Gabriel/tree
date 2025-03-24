import json

def load_tree_data(filename="tree_data.json"):
    try:
        with open(filename, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        data = {}
    return data

def save_tree_data(data, filename="tree_data.json"):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

def add_company(company_name, trees_count, filename="tree_data.json"):
    data = load_tree_data(filename)
    if company_name in data:
        data[company_name] += trees_count
    else:
        data[company_name] = trees_count
    save_tree_data(data, filename)
    print(f"Added {trees_count} trees for {company_name}")

# Example usage
if __name__ == "__main__":
    add_company("Company D", 50)
    add_company("Company E", 300)
    # Print the total number of trees planted
    print("Total trees planted:", counter.get_total_trees())
