import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurveType, KeyboardLayout } from "@/src/lib/util/constant";

const Options = ({
  layout,
  setLayout,
  curveType,
  setCurveType,
}: {
  layout: KeyboardLayout;
  setLayout: (layout: KeyboardLayout) => void;
  curveType: CurveType;
  setCurveType: (curveType: CurveType) => void;
}) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div>Options</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuItem>
            <Select
              value={layout}
              onValueChange={(v) => setLayout(v as KeyboardLayout)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Layout" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(KeyboardLayout).map((l) => (
                  <SelectItem key={l} value={l}>
                    {l.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Select
              value={curveType}
              onValueChange={(v) => setCurveType(v as CurveType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Curve Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="catmull-rom">Catmull-Rom</SelectItem>
                <SelectItem value="quadratic-bezier">Quadratic</SelectItem>
                <SelectItem value="cubic-bezier">Cubic</SelectItem>
                <SelectItem value="simple-curve">Simple</SelectItem>
              </SelectContent>
            </Select>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Options;
