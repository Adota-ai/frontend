import * as React from "react";
import {
	Home,
	LineChart,
	Package,
	Package2,
	PanelLeft,
	Settings,
	ShoppingCart,
	Users2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Outlet } from "react-router-dom";

export default function Display() {
	return (
		<div className="flex min-h-screen w-full flex-col bg-neutral-100/40 dark:bg-neutral-800/40">
			<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-white sm:flex dark:bg-neutral-950">
				<nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
					<Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
					<span className="sr-only">Acme Inc</span>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<div>
									<Home className="h-5 w-5" />
									<span className="sr-only">Dashboard</span>
								</div>
							</TooltipTrigger>
							<TooltipContent side="right">Dashboard</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</nav>
				<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<div>
									<Settings className="h-5 w-5" />
									<span className="sr-only">Settings</span>
								</div>
							</TooltipTrigger>
							<TooltipContent side="right">Settings</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</nav>
			</aside>
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 dark:bg-neutral-950">
					<Sheet>
						<SheetTrigger asChild>
							<Button size="icon" variant="outline" className="sm:hidden">
								<PanelLeft className="h-5 w-5" />
								<span className="sr-only">Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="sm:max-w-xs">
							<nav className="grid gap-6 text-lg font-medium">
								<Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
								<span className="sr-only">Acme Inc</span>
								<Home className="h-5 w-5" />
								Dashboard
								<ShoppingCart className="h-5 w-5" />
								Orders
								<Package className="h-5 w-5" />
								Products
								<Users2 className="h-5 w-5" />
								Customers
								<LineChart className="h-5 w-5" />
								Settings
							</nav>
						</SheetContent>
					</Sheet>
				</header>
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
					<React.Suspense>
						<Outlet />
					</React.Suspense>
				</main>
			</div>
		</div>
	);
}
