import { useEffect, useState } from "react";
import { FilterBox } from "./comboBox";
import { toast } from "@/components/ui/use-toast";
interface SearchProps {
    onSearch: (a:string) => void
}
const Search = ({onSearch} : SearchProps) => {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filterSearch, setFilterSearch] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query:string = e.target.value;
        if (!query.includes('_') && !query.includes('@') && !query.includes('?')) {
            setSearchQuery(query);
        } else {
            toast({
                variant: "destructive",
                title: "Warning",
                description: "Không được nhập kí tự đặc biệt ",
            });
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const result = mapFilterSearchValue(filterSearch) + searchQuery.toLowerCase();
            onSearch(result);
        }, 500)
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, filterSearch])

    const frameworksFilter = [
        {
            value: "brightness",
            label:  "Brightness"
        },
        {
            value: "humidity",
            label: "Humidity",
        },
        {
            value: "temp",
            label: "Temp",
        }
      ]



      const handleFilterChange = (str : string) => {
        setFilterSearch(str);
      }

      function mapFilterSearchValue(filterSearch: string): string {
        switch (filterSearch) {
          case 'temp':
            return 't_';
          case 'humidity':
            return 'h_';
          case 'brightness':
            return 'b_';
          default:
            return filterSearch; 
        }
      }

    return ( 
        <div className="flex flex-row bg-primary/10 p-1 w-full md:w-[fit-content] rounded-md gap items-center">
            <input type="text" id="search" name="search" className="outline-none w-full md:w-auto border-none rounded text-sm" placeholder="Nhập vào đây để tìm kiếm..." 
                onChange={handleInputChange}
            />
            <FilterBox frameworks={frameworksFilter} onHandle={handleFilterChange}/>
        </div>
    );
}
 
export default Search;