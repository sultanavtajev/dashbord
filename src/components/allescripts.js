import React, { useState, useEffect } from "react";
import { storage } from "../../firebaseConfig";
import { ref, listAll } from "firebase/storage";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // Sørg for at denne importen er korrekt

export default function Allescripts() {
  const [directories, setDirectories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [fileLists, setFileLists] = useState({});

  useEffect(() => {
    const fetchDirectories = async () => {
      const rootRef = ref(storage, "");
      try {
        const response = await listAll(rootRef);
        const dirs = response.prefixes.map(async (folderRef) => {
          const folderFiles = await listAll(folderRef);
          const files = folderFiles.items.map((fileRef) => fileRef.name);
          return {
            name: folderRef.name,
            files: files,
          };
        });
        const resolvedDirs = await Promise.all(dirs);
        setDirectories(resolvedDirs);
        const filesMap = {};
        resolvedDirs.forEach((dir) => {
          filesMap[dir.name] = dir.files;
        });
        setFileLists(filesMap);
      } catch (error) {
        console.error("Error fetching directories", error);
      }
    };

    fetchDirectories();
  }, []);

  const toggleDropdown = (name) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Scripts</CardTitle>
          <CardDescription>Alle scripts i databasen</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mappe</TableHead>
                <TableHead className="text-center">Antall filer</TableHead>
                <TableHead className="text-right">Mer informasjon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {directories.map((dir, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell>{dir.name}</TableCell>
                    <TableCell className="text-center">
                      {dir.files.length}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => toggleDropdown(dir.name)}>
                        {openDropdown === dir.name
                          ? "Skjul filer"
                          : "Vis filer"}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {openDropdown === dir.name && (
                    <TableRow>
                      <TableCell colSpan="3">
                        <ul>
                          {dir.files.map((file, idx) => (
                            <li key={idx}>{file}</li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
